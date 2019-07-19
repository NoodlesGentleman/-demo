package com.sof.marketing.dto;

import java.util.List;

import com.sof.marketing.model.Redpackheadconfig;
import com.sof.marketing.model.Redpackparams;

public class RedPackConfigDto {
	private Redpackheadconfig head;
	
	private List<Redpackparams> props;

	public Redpackheadconfig getHead() {
		return head;
	}

	public void setHead(Redpackheadconfig head) {
		this.head = head;
	}

	public List<Redpackparams> getProps() {
		return props;
	}

	public void setProps(List<Redpackparams> props) {
		this.props = props;
	}

}
